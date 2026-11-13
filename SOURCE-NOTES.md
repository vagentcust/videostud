# Subscription source

The membership predicate, fail-closed handling, callback name and subscription button emoji were ported from the user's V-Agent-Telegram-Bot/handlers.py and keyboards.py (Downloads copy). The Python/aiogram logic is adapted to Node.js with Telegram getChatMember. Default channel @vagentai is from that project's config.py.

The bot rechecks each private message and callback. Telegram failures never grant access. Administrator access to the channel is required. This gates bot navigation only: the public client-side editor is not a protected backend. Future paid/server rendering must independently validate Telegram initData and membership server-side.
