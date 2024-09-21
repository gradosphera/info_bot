import fetch from 'node-fetch';
import TelegramBot, { ChatId, MessageEntityType, SendMessageOptions } from 'node-telegram-bot-api';
import 'dotenv/config'
import http from 'http';
import express from 'express';

const SERVER_PORT = process.env.PORT || '3000';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(TOKEN || '', { polling: true });

bot.onText(/\/start/, (msg: any) => { //todo rm any
    const chatId = msg.chat.id;

    const message = `♻️ EcoPlay | Коды переработки

Добро пожаловать в "EcoPlay" — приложение, которое поможет вам научиться принципам раздельного сбора!

С помощью приложения вы сможете погрузиться в мир переработки. Просто нажмите на символ ♻️ и начинайте получать уникальные коды переработки различных материалов, таких как PET, поливинилхлорид и многие другие!

🗑️ Как это работает?

1. Нажимайте на символ раздельного сбора — каждое нажатие приносит вам новые коды переработки.
2. Изучайте коды — каждая игра помогает вам быстрее запомнить важную информацию о переработке и раздельном сборе отходов.
3. Обменивайте коды на жетоны Благо — заработанные коды можно обменять на жетоны, которые, в свою очередь, можно использовать для участия в различных акциях и мероприятиях сообществ ДАО Градосфера, Чистая Лига.

🌍 Почему это важно?
"EcoPlay" не только увлекателен, но и крайне полезен. Вы сможете развить привычку раздельного сбора и осознанного потребления уже сегодня, а также внести свой вклад в защиту природы!

Присоединяйтесь к нам в этом увлекательном путешествии и станьте частью движения! Начните раздельный сбор и учитесь — вместе мы можем сделать мир чище!

/iliga - Карта Чистая Лига
`;
  const options: SendMessageOptions = {
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "♻️ Запустить",
            web_app: { url: "https://ecoplay.mir.one" },
          },
        ],
        [
          {
            text: "⁉️ Задать вопрос",
            url: "https://t.me/dao_gradosphera_support_bot",
          },
          {
            text: "Доступ к ДАО",
            url: "https://t.me/dao_gradosphera_verify_bot",
          },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, message, options);
});

bot.onText(/\/iliga/, (msg: any) => {
  //todo rm any
  const chatId = msg.chat.id;

  const message = `Мы — сообщество «Чистая Лига»
Наше объединение волонтёров служит благоустройству городов и решению мусорной проблемы. Мы создаем сигналы о проблемах, собираем волонтёров и ресурсы и проводим общие мероприятия по их решению.

**Как это рабоотает?**
Для решения мусорной проблемы мы создаем о ней сигналы, планируем мероприятие по уборке мусора и, наконец, проводим уборку.

🆘 Проблема
Мусор на улице. Разрушенное благоустройство.

📷 Опишите проблему
Отметьте точку на карте. Опишите проблему или идею. Прикрепите фото.

🔃 Обработка сигнала
После модерации сигнал попадает на карту и в список. Пользователи голосуют за сигналы.

📢 Создание события
Любой волонтёр может взять на себя работу с сигналом и назначить событие для его решения. Он становится хозяином события. Ему нужно определить дату и время события, взять перчатки, жилеты и прочий инвентарь в пунктах наших [Партнёров](https://info.iliga.ru/#!).

🧹 Сбор участников на событие среди волонтёров.
Любой волонтёр может присоединится к созданному событию!

/start -5 EcoPlay
`;
  const options: SendMessageOptions = {
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🗺 Открыть карту",
            url: "https://t.me/iligarubot/app",
          },
        ],
        [
          {
            text: "СМИ",
            url: "https://t.me/iLigaKMS",
          },
          {
            text: "О нас",
            url: "https://info.iliga.ru/About",
          },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, message, options);
});

bot.on("polling_error", console.log);


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(join(path.resolve(''), 'public')));

app.set('port', SERVER_PORT);

const server = http.createServer(app);
server.listen(SERVER_PORT);

server.on('listening', () => {
    console.info(`Listening on ${SERVER_PORT}`);
});
