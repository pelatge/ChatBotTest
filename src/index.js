module.exports = async function App(context) {
  if (context.event.isFollow) {
    await context.sendText(
      `Wah, terima kasih ya ${String.fromCodePoint(
        0x100078
      )} sudah di add sama kamu! \nMau tau lebih lengkap tentang bot ini? Ketik 'info' (tanpa kutip) untuk deskripsi lebih lengkap.`
    );
  }
};
