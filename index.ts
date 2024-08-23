import type { AstroIntegration } from "astro"
import { createScript, createStyleSheet } from "@poppinss/dumper/html"

/**
 * Returns the script code for creating a style tag
 * dynamically.
 */
function createStyleTag() {
  return `const head = document.head;
const style = document.createElement('style');
const contents = document.createTextNode(\`${createStyleSheet()}\`);
style.setAttribute('id', 'astro-dump-styles');
head.appendChild(style);
style.appendChild(contents);`
}

export default function(options?: { command?: 'preview' | 'build' | 'dev' | 'always' }) {
  const forCommand = options?.command || 'dev'

  const integration: AstroIntegration = {
    name: 'astro-dump',
    hooks: {
      'astro:config:setup': ({ command, injectScript, logger }) => {
        if (forCommand === 'always' || command === forCommand) {
          logger.info('Injected astro-dump script and styles')
          injectScript('head-inline', `${createScript()}\n${createStyleTag()}`)
        }
      },
    }
  }
  return integration
}