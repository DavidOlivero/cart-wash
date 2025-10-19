import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { DataTypes } from '../constants/enums/data-types-enum';


export class Utils {
  public static async makeFormulary(header: string, questions: { ask: string; type: DataTypes }[]): Promise<string[]> {
    const rl = readline.createInterface({ input: stdin, output: stdout });
    const answers: string[] = [];

    console.log(header)
    for (const question of questions) {
      while (true) {
        const answer = await rl.question(question.ask);
        if (answer.trim() === '' || question.type === DataTypes.Number && isNaN(Number(answer))) {
          console.log('El valor especificado es incorrecto, ingrese un valor válido');
          continue;
        }

        answers.push(answer);
        break;
      }
    }

    rl.close();
    console.clear()
    return answers;
  };
}

