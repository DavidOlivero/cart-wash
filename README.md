# Para iniciar el proyecto primero es necesario instalar bunjs:

- Para Windows:
```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

- Para Mac y Linux:
```bash
curl -fsSL https://bun.sh/install | bash
```

## Luego se debe instalar las dependencias:

```bash
bun install
```

### Por último puede ejecutar el proyecto:

- Para ejecutar en consola es necesario dirigirse al fichero src/core/utils/Utils.ts y descomentar todo el código y comentar la promesa retornada
```typescript
public static async makeFormulary(header: string, questions: { ask: string; type: DataTypes }[]): Promise<string[]> {
  // const rl = readline.createInterface({ input: stdin, output: stdout });
  // const answers: string[] = [];
  //
  // console.log(header)
  // for (const question of questions) {
  //   while (true) {
  //     const answer = await rl.question(question.ask);
  //     if (answer.trim() === '' || question.type === DataTypes.Number && isNaN(Number(answer))) {
  //       console.log('El valor especificado es incorrecto, ingrese un valor válido');
  //       continue;
  //     }
  //
  //     answers.push(answer);
  //     break;
  //   }
  // }
  //
  // rl.close();
  // console.clear()
  // return answers; -> Descomentar este código

  return new Promise((resolve) => { // -> Comentar este bloque
    resolve([''])
  })
};
```

**Luego ya es posible ejecutar este comando**
```bash
bun run start
```

- Para ejecutar en el navegador es necesario hacer lo contrario al paso anterior y ejecutar el siguiente comando:
```bash
bunx serve
```
**Esto abrirá un enlace en el navegador con el proyecto debe navegar a esta ruta: src/web/**
