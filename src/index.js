const { router, line } = require("bottender/router");
let order = [];
let summary_total_harga = 0;

module.exports = async function App() {
  return router([
    line.follow(HandleFollow),
    line.unfollow(HandleUnfollow),
    line.message(HandleMessage),
    line.postback(HandlePostBack),
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

async function HandlePostBack(context) {
  if (context.event.payload.split(" ").length > 1) {
    const context_temp = context.event.payload.split(" ");
    const menu_name = context_temp[0];
    const menu_count = context_temp[1];
    const menu_price = context_temp[2];
    if (order.length === 0) {
      let order_temp = {
        name: menu_name,
        count: menu_count,
        price: menu_price,
      };
      order.push(order_temp);
      await context.sendText(
        `Berhasil menambahkan ${menu_name} sebanyak ${menu_count} ke keranjang\nKetik 'ringkasan' (tanpa kutip) untuk melihat detail pesanan`
      );
    } else {
      let order_temp = {
        name: menu_name,
        count: menu_count,
        price: menu_price,
      };
      let flag = false;
      for (let i = 0; i < order.length; i++) {
        if (order[i].name === order_temp.name) {
          order[i].count++;
          flag = true;
          await context.sendText(
            `${order[i].name} jumlahnya nambah 1 di keranjang\nKetik 'ringkasan' (tanpa kutip) untuk melihat detail pesanan`
          );
        }
      }
      if (flag === false) {
        order.push(order_temp);
        await context.sendText(
          `Berhasil menambahkan ${menu_name} sebanyak ${menu_count} ke keranjang\nKetik 'ringkasan' (tanpa kutip) untuk melihat detail pesanan`
        );
      }
    }
  } else {
    await context.sendText(`Oke siap kak, lanjutkan pesanan`);
  }
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
                    text: "Rp 15.000 (isi 6 pcs)",
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
              data: "Sushi 1 15000",
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
              data: "Tempura 1 10000",
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
  } else if (context.event.text === "ringkasan") {
    summary_total_harga = 0;
    if (order.length === 0) {
      await context.sendText(`Wah keranjang belanjanya masih kosong kak`);
    } else {
      await context.sendText(
        `Berikut pesanan yang ada dikeranjang kakak sekarang ini`
      );
      for (let i = 0; i < order.length; i++) {
        await context.sendText(
          `${order[i].name}\nJumlah: ${
            order[i].count
          }\nHarga (harga satuan x jumlah yang dipesan): Rp ${numberWithCommas(
            order[i].price * order[i].count
          )}`
        );
        summary_total_harga += order[i].price * order[i].count;
      }
      context.replyButtonTemplate("This is a button template", {
        thumbnailImageUrl:
          "https://health.clevelandclinic.org/wp-content/uploads/sites/3/2019/06/cropped-GettyImages-643764514.jpg",
        title: "Total Harga",
        text: `Rp ${numberWithCommas(
          summary_total_harga
        )}\nYakin dengan pesanan anda?`,
        actions: [
          {
            type: "location",
            label: "Ya (Send location)",
          },
          {
            type: "postback",
            label: "Belum",
            data: "belum",
          },
        ],
      });
    }
  } else if(context.event.isLocation){
    if(order.length === 0){
      await context.sendText(`Waduh keranjang pesanannya masih kosong kak, coba pilih-pilih menunya dulu dengan cara ketik 'pesan' (tanpa kutip)`)
    } else{
      await context.sendText(`Oke, kurir akan mengantarkan pesanan ke ${context.event.location.address}\n\nJangan lupa siapkan uang sebanyak Rp ${numberWithCommas(summary_total_harga)}. Terima kasih sudah memesan di DeMangan ini.`);
      order = [];
      summary_total_harga = 0;
    }
  } else {
    salahKeywordHandler(context, `Wah salah keyword nih`);
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function salahKeywordHandler(context, message) {
  await context.sendText(message);
}
