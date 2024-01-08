// plugins sources
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import createImagePlugin from '@draft-js-plugins/image';
import createLinkDetectionPlugin from 'draft-js-link-detection-plugin';
import createLinkPlugin from '@draft-js-plugins/anchor';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import createMentionPlugin, {defaultSuggestionsFilter} from '@draft-js-plugins/mention';


// plugins css
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import '@draft-js-plugins/linkify/lib/plugin.css';
import '@draft-js-plugins/image/lib/plugin.css';
import '@draft-js-plugins/emoji/lib/plugin.css';
import '@draft-js-plugins/mention/lib/plugin.css';
import '@draft-js-plugins/hashtag/lib/plugin.css';

 

// custom css
import toolbarStyles from './toolbar.module.css'
import buttonStyles from './toolbarButton.module.css';
import mentionsStyles from './MentionsStyles.module.css';
import hashtagStyles from  './hashtagStyles.module.css';

// initialize plugins
const linkifyPlugin = createLinkifyPlugin();
export const toolbarPlugin = createToolbarPlugin({
  theme:{toolbarStyles, buttonStyles}
});

 
const imagePlugin = createImagePlugin();
const linkDetectionPlugin = createLinkDetectionPlugin();
const emojiPlugin = createEmojiPlugin();
export const mentionPlugin = createMentionPlugin({
  entityMutability: 'IMMUTABLE',
  mentionPrefix: '@',
  supportWhitespace: true,
  theme: mentionsStyles, 
});
export const linkPlugin = createLinkPlugin();
const hashtagPlugin = createHashtagPlugin({theme: hashtagStyles});



export const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
export const  mentionFilter = defaultSuggestionsFilter;


export const plugins = [
  linkifyPlugin,
  toolbarPlugin,
  imagePlugin,
  linkDetectionPlugin,
  emojiPlugin,
  mentionPlugin,
  linkPlugin,
  hashtagPlugin
]
 