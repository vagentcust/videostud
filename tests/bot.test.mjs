import test from 'node:test';
import assert from 'node:assert/strict';
import {menu,decorate} from '../bot-ui.mjs';
test('premium message emoji uses Telegram HTML and fallback',()=>{assert.equal(decorate('🎬 Студия',{EMOJI_MONTAGE:'123'}),'<tg-emoji emoji-id="123">📷</tg-emoji> Студия');assert.equal(decorate('🎬 Студия',{}),'🎬 Студия');});
test('local mode never sends invalid HTTP Mini App button',()=>{const m=menu({WEBAPP_URL:'http://127.0.0.1:4173'});assert.equal(m.inline_keyboard[0][0].callback_data,'local');assert.equal(m.inline_keyboard[0][0].web_app,undefined);});
test('HTTPS app and configured emoji are attached',()=>{const b=menu({WEBAPP_URL:'https://example.com',EMOJI_MONTAGE:'123456'}).inline_keyboard[0][0];assert.equal(b.web_app.url,'https://example.com');assert.equal(b.icon_custom_emoji_id,'123456');});
test('unconfigured or malformed emoji has safe fallback',()=>{assert.equal(menu({EMOJI_MONTAGE:'invalid'}).inline_keyboard[0][0].icon_custom_emoji_id,undefined);});
