
import React from "react";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
  // Replace emoji shortcodes with actual emojis
  const processEmojis = (text: string) => {
    return text
      .replace(/:rocket:/g, '🚀')
      .replace(/:chart_with_upwards_trend:/g, '📈')
      .replace(/:chart_with_downwards_trend:/g, '📉')
      .replace(/:warning:/g, '⚠️')
      .replace(/:bulb:/g, '💡')
      .replace(/:star:/g, '⭐')
      .replace(/:moneybag:/g, '💰')
      .replace(/:dollar:/g, '💵')
      .replace(/:chart:/g, '📊')
      .replace(/:thumbsup:/g, '👍')
      .replace(/:thumbsdown:/g, '👎');
  };
  
  // Convert markdown headers with emojis
  const processHeaders = (text: string) => {
    return text
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-8 mb-4 flex items-center gap-2"><span class="text-crypto-primary">📊</span>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold mt-6 mb-3 text-crypto-secondary flex items-center gap-2"><span class="text-crypto-yellow">📈</span>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-medium mt-4 mb-2 flex items-center gap-2"><span class="text-crypto-green">💡</span>$1</h3>')
      .replace(/^#### (.+)$/gm, '<h4 class="text-lg font-medium mt-3 mb-2 flex items-center gap-2"><span class="text-crypto-primary">🔍</span>$1</h4>');
  };

  // Convert markdown links
  const processLinks = (text: string) => {
    return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-crypto-primary hover:underline">$1</a>');
  };

  // Convert emphasis (bold/italic)
  const processEmphasis = (text: string) => {
    return text
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-crypto-secondary">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="text-crypto-yellow">$1</em>');
  };

  // Remove code blocks and chart data (handled separately by the component)
  const processCodeBlocks = (text: string) => {
    return text.replace(/```chart\n[\s\S]*?\n```/g, '');
  };

  // Convert lists with emoji bullets
  const processLists = (text: string) => {
    // Find all unordered lists and add emoji bullets
    text = text.replace(/^(\s*)-\s(.+)$/gm, '$1<li class="flex items-start gap-2 mb-2"><span class="text-crypto-green mt-1">•</span><span>$2</span></li>');
    
    // Find all ordered lists with colorful numbers
    text = text.replace(/^(\s*)(\d+)\.\s(.+)$/gm, 
      '$1<li class="flex items-start gap-2 mb-2"><span class="text-crypto-primary font-bold">$2.</span><span>$3</span></li>');
    
    // Wrap adjacent <li> elements in <ul> or <ol> tags
    const lines = text.split('\n');
    let inList = false;
    let listType = '';
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('<li>') && !inList) {
        // Detect if it's an ordered or unordered list based on the original markdown
        listType = lines[i-1]?.match(/^\s*\d+\./) ? 'ol' : 'ul';
        lines[i] = `<${listType} class="${listType === 'ul' ? 'list-disc' : 'list-decimal'} pl-0 my-3 space-y-1">` + lines[i];
        inList = true;
      } else if (!lines[i].includes('<li>') && inList) {
        lines[i-1] += `</${listType}>`;
        inList = false;
      }
    }
    
    // Close any open list at the end
    if (inList) {
      lines.push(`</${listType}>`);
    }
    
    return lines.join('\n');
  };

  // Convert paragraphs with improved styling
  const processParagraphs = (text: string) => {
    // Split by newlines
    const lines = text.split('\n');
    let result = [];
    let inHtml = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines
      if (line === '') {
        result.push('');
        continue;
      }
      
      // Skip lines that are already HTML or inside HTML blocks
      if (line.startsWith('<') || inHtml) {
        // Check if we're entering or leaving an HTML block
        const openTags = (line.match(/<[^/][^>]*>/g) || []).length;
        const closeTags = (line.match(/<\/[^>]+>/g) || []).length;
        
        if (openTags > closeTags) {
          inHtml = true;
        } else if (closeTags >= openTags && inHtml) {
          inHtml = false;
        }
        
        result.push(line);
        continue;
      }
      
      // Wrap in paragraph tags if it's not a header
      if (!line.startsWith('#')) {
        result.push(`<p class="my-3 text-slate-300 leading-relaxed">${line}</p>`);
      } else {
        result.push(line);
      }
    }
    
    return result.join('\n');
  };

  // Process blockquotes with nice styling
  const processBlockquotes = (text: string) => {
    return text.replace(/^>\s(.+)$/gm, 
      '<blockquote class="border-l-4 border-crypto-primary pl-4 py-1 my-4 bg-gradient-to-r from-crypto-card/50 to-transparent">$1</blockquote>');
  };

  // Add special styling for price predictions, portfolio allocations, etc.
  const processSpecialContent = (text: string) => {
    // Style price targets
    text = text.replace(/(\$\d+(?:,\d+)*(?:\.\d+)?)/g, 
      '<span class="text-crypto-green font-mono font-semibold">$1</span>');
    
    // Style percentages
    text = text.replace(/(\d+%)(?!\])/g, 
      '<span class="text-crypto-yellow font-semibold">$1</span>');
    
    return text;
  };

  const processMarkdown = (markdown: string) => {
    let processed = markdown;
    processed = processCodeBlocks(processed);
    processed = processEmojis(processed);
    processed = processHeaders(processed);
    processed = processBlockquotes(processed);
    processed = processLists(processed);
    processed = processLinks(processed);
    processed = processEmphasis(processed);
    processed = processSpecialContent(processed);
    processed = processParagraphs(processed);
    
    return processed;
  };

  return (
    <div 
      className={cn("markdown prose prose-invert max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: processMarkdown(content) }}
    />
  );
};

export default MarkdownRenderer;
