import {Command, flags} from '@oclif/command'
const fs = require('fs')

export default class GenerateKey extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    // to automatically save the key to a local json file
    save: flags.boolean({char: 's'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(GenerateKey)

    const key = [...Array(16)].map(i=>(~~(Math.random()*36)).toString(36)).join('');

    if (flags.save) {
      fs.writeFile('key.txt', key, () => {
        this.log("Key saved to 'key.txt'!")
      })
    } else {
      this.log(key)
    }

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
