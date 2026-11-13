export function button(text,key,action,env=process.env){const id=env['EMOJI_'+key];const custom=/^\d+$/.test(id||'');return {text:custom?text.replace(/^\S+\s/u,''):text,...action,...(custom?{icon_custom_emoji_id:id}:{})};}
export function decorate(text,env=process.env){for(const [key,emoji,fallback] of [['MONTAGE','🎬','📷'],['GIFT','🎁','🎁'],['WALLET','💎','💎'],['SUPPORT','💬','💬']]){const id=env['EMOJI_'+key];if(/^\d+$/.test(id||''))text=text.replaceAll(emoji,`<tg-emoji emoji-id="${id}">${fallback}</tg-emoji>`);}return text;}
export function menu(env=process.env){const app=/^https:\/\//.test(env.WEBAPP_URL||'');return {inline_keyboard:[
 [button('🎬 Начать монтаж','MONTAGE',app?{web_app:{url:env.WEBAPP_URL}}:{callback_data:'local'},env)],
 [button('💎 Баланс','WALLET',{callback_data:'balance'},env),button('🎁 Пригласить друга','GIFT',{callback_data:'referral'},env)],
 [button('💬 Поддержка','SUPPORT',/^https:\/\//.test(env.SUPPORT_URL||'')?{url:env.SUPPORT_URL}:{callback_data:'support'},env)]
 ]};}
export const welcome='🎬 <b>REELY — истории в твоём ритме</b>\n\nМеньше лишнего. Больше твоего характера.\n\n✦ Загрузи видео и обрежь фрагменты\n✦ Выбери формат кадра и стиль\n✦ Добавь подпись или субтитры SRT\n✦ Экспортируй готовое видео\n\n💎 <b>Всё на твоём устройстве.</b>\nАвтораспознавание речи и платный автомонтаж пока не подключены.';
