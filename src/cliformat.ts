import program from 'commander';
import fs from 'fs';
import path from 'path';
import { format } from './prettyprint';

program
    .option('-i, --inplace', 'edit the files in place. [false]')
    .option('-I, --indent <value>', 'number of spaces to indent. [4]', '4')
    .option('-t, --use-tabs', 'use tabs for indentation (will ignore indentWidth). [false]')
    .option('--close-tag-sameline', "never place the closing tag '>' on a new line. [false]")
    .parse(process.argv);

const { inplace = false, indent, useTabs = false, closeTagSameline = false } = program as any;

let changed = 0;
program.args.forEach((file: string) => {
    let fileName = file;
    if (!fileName.startsWith('/')) {
        fileName = path.resolve(process.cwd(), fileName);
    }

    if (inplace) {
        console.log('processing', file);
    }

    let source = fs.readFileSync(fileName).toString();
    let pretty = format(source, indent, !useTabs, closeTagSameline);
    if (pretty != source) {
        changed++;
    }
    if (inplace) {
        fs.writeFileSync(fileName, pretty);
    } else {
        process.stdout.write(pretty);
    }
});
if (inplace) {
    console.log(changed + ' file' + (changed == 1 ? '' : 's') + ' files changed');
    let skipped = program.args.length - changed;
    console.log(skipped + ' file' + (skipped == 1 ? '' : 's') + ' files unchanged');
}
