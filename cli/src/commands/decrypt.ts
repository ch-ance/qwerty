import {Command, flags} from '@oclif/command'
import decryptHex from "../helpers/decrypt-text";

export default class Decrypt extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    hex: flags.string({char: 'h', description: 'encrypted hex'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Decrypt)

    if (!flags.hex){
      return
    }
    
    const hex = flags.hex;
    this.log(decryptHex(hex));

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
