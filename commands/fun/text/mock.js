const Social = require("../../../structures/Social.js");
const { readFile } = require("fs-nextra");

class Mock extends Social {
  constructor(...args) {
    super(...args, {
      name: "mock",
      description: "Mocks a nominated message.",
      usage: "mock",
      category: "Fun",
      extended: "Based on the popular Spongebob Squarepants mocking meme.",
      cost: 10,
      cooldown: 10
    });
  }


  async cmdVerify(message, args, loadingMessage) {
    const grabMock = args.length === 0 ? await message.channel.messages.fetch({ limit:1, before: message.id}) : await message.channel.messages.fetch(await this.verifyMessage(message, args[0], { msg: loadingMessage }));
    const mockBob = await readFile("./assets/images/spongebob.png");
    const mock = grabMock.size === 1 ? grabMock.first() : grabMock;
    if (mock.author.bot) throw new this.client.methods.errors.UsageError("You cannot mock bots.", loadingMessage);
    return { mock, mockBob };
  }

  async run(message, args, level, loadingMessage) { 
    const { mock, mockBob } = await this.cmdVerify(message, args, loadingMessage);
    await message.channel.send(await this.client.idiotAPI.mock(mock.cleanContent), {files: [{attachment: mockBob, name: "mock.png"}]});
  }
}

module.exports = Mock;
