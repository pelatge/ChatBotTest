const { router, line } = require("bottender/router");

module.exports = async function App() {
  return router([
    line.follow(HandleFollow),
    line.unfollow(HandleUnfollow),
    line.message(HandleMessage),
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

async function HandleMessage(context) {
  if (context.event.text === "info") {
    await context.sendText(
      `DeMangan ini adalah aplikasi buatan Yehezkiel Gunawan sebagai submisi project dari kelas LINE Dicoding Academy kelas Chatbot.\n\nAplikasi ini dibuat dengan Node JS dengan bantuan library Bottender 1.4.`
    );
  } else {
    await context.sendText(`Wah salah keyword nih`);
  }
}
