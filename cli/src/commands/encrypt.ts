import {Command, flags} from '@oclif/command'
import encryptText from "../helpers/encrypt-text";

export default class Encrypt extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    text: flags.string({char: 't', description: 'text to encrypt'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Encrypt)

    if (!flags.text) {
      this.log("No text given");
      return;
    }

    const text = flags.text;
    this.log(encryptText(text));

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
