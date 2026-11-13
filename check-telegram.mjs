const token=process.env.BOT_TOKEN;
async function call(method,data={}){try{const response=await fetch(`https://api.telegram.org/bot${token}/${method}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(20000)});const result=await response.json();if(!result.ok)throw Error(result.description);return result.result;}catch(e){console.error('Telegram check failed:',e.cause?.code||e.message.replaceAll(token,'[REDACTED]'));process.exit(1);}}
const me=await call('getMe');const webhook=await call('getWebhookInfo');
const ids=['MONTAGE','GIFT','WALLET','SUPPORT'].map(k=>process.env['EMOJI_'+k]);const stickers=await call('getCustomEmojiStickers',{custom_emoji_ids:ids});
console.log(JSON.stringify({username:me.username,id:me.id,webhookConfigured:!!webhook.url,pendingUpdates:webhook.pending_update_count,emoji:stickers.map(s=>({id:s.custom_emoji_id,emoji:s.emoji,animated:s.is_animated,video:s.is_video}))},null,2));
if(webhook.url){console.error('Existing webhook found; polling not started.');process.exit(2);}
