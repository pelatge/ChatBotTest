const { router, line } = require("bottender/router");

module.exports = async function App() {
  return router([
    line.follow(HandleFollow),
    line.unfollow(HandleUnfollow),
    line.message(HandleMessage),
    line.postback(HandlePostBack)
  ]);
};

async function HandleFollow(context) {

  await context.sendText(
    `Wah, terima kasih ya ${String.fromCodePoint(
      0x100078
    )} sudah di add sama kamu! \nMau tau lebih lengkap tentang bot ini? Ketik 'info' (tanpa kutip) untuk deskripsi lebih lengkap.`
  );
}

async function HandleUnfollow(context) {
  await context.sendText(
    `Terima kasih sudah mempercayakan bot ini di LINE anda, semoga bot ini memberikan manfaat dan kesan baik bagi anda :D.`
  );
}

async function HandlePostBack(context){
  await context.sendText(`Nah ada postback: ${context.event.payload}`);
}

async function HandleMessage(context) {
  if (context.event.text === "info") {
    await context.sendText(
      `DeMangan ini adalah aplikasi buatan Yehezkiel Gunawan sebagai submisi project dari kelas LINE Dicoding Academy kelas Chatbot.\n\nAplikasi ini dibuat dengan Node JS dengan bantuan library Bottender 1.4.\n\nKetik 'hitung'(tanpa kutip) agar bot bisa berhitung bersama kamu. Tapi cuma sampe 5 aja ya, kasian takut kelelahan dia.\n\nKetik 'pesan' (tanpa kutip) apabila anda ingin memesan makanan yang bisa dikirim ke rumah anda.\n\nSilahkan gunakan LINE pada Android/Iphone device anda untuk mendapatkan full experience.`
    );
  } else if (context.event.text === "hitung") {
    const count = context.state.count + 1;
    context.setState({
      count,
    });
    if (count === 5) {
      await context.sendText(
        `Wah dah sampe ${count} dah dulu ya, cape saya ngitung mulu. Kita reset lagi jadi 1.`
      );
      context.setState({ count: 0 });
    } else {
      await context.sendText(`Count : ${count}`);
    }
  } else if (context.event.text === "pesan") {
    const sushiMenu = {
      type: "bubble",
      hero: {
        type: "image",
        url:
          "https://image.freepik.com/free-photo/traditional-japanese-nigiri-sushi-with-salmon-placed-chopsticks_115594-780.jpg",
        size: "full",
        aspectRatio: "20:13",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "Sushi",
            weight: "bold",
            size: "xl",
          },
          {
            type: "box",
            layout: "vertical",
            margin: "lg",
            contents: [
              {
                type: "box",
                layout: "baseline",
                contents: [
                  {
                    type: "text",
                    text: "Harga",
                    color: "#aaaaaa",
                    size: "sm",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: "Rp 15.000/6pcs",
                    wrap: true,
                    color: "#666666",
                    size: "sm",
                    flex: 5,
                  },
                ],
              },
            ],
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            action: {
              type: "postback",
              label: "BELI",
              data: "Sushi 1",
            },
          },
        ],
      },
    };
    const tempuraMenu = {
      type: "bubble",
      hero: {
        type: "image",
        url:
          "https://image.freepik.com/free-photo/batter-fried-prawns-wood_1339-7705.jpg",
        size: "full",
        aspectRatio: "20:13",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "Tempura",
            weight: "bold",
            size: "xl",
          },
          {
            type: "box",
            layout: "vertical",
            margin: "lg",
            contents: [
              {
                type: "box",
                layout: "baseline",
                contents: [
                  {
                    type: "text",
                    text: "Harga",
                    color: "#aaaaaa",
                    size: "sm",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: "Rp 10.000",
                    wrap: true,
                    color: "#666666",
                    size: "sm",
                    flex: 5,
                  },
                ],
              },
            ],
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            action: {
              type: "postback",
              label: "BELI",
              data: "Tempura 1",
            },
          },
        ],
      },
    };
    await context.sendFlex("This is a carousel flex", {
      type: "carousel",
      contents: [
        // put multiple bubbles in your carousel
        sushiMenu,
        tempuraMenu,
      ],
    });
  } else {
    salahKeywordHandler(context, `Wah salah keyword nih`);
  }
}

async function salahKeywordHandler(context, message) {
  await context.sendText(message);
}
