const { red, bgCyan, magenta, blue } = require('colors');
const fs = require('fs');
const readline = require('readline');
require('colors');

// Nome do arquivo de entrada
const inputFileName = 'input.txt';

// Nome do arquivo de saída
const outputFileName = 'output.txt';

// Criar uma interface para leitura do terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to handle the search based on the selected option
const searchLink = (linkToFind, optionName) => {
  // Criar um stream de leitura para o arquivo de entrada
  const readStream = fs.createReadStream(inputFileName, 'utf8');

  // Criar um stream de gravação para o arquivo de saída
  const writeStream = fs.createWriteStream(outputFileName, 'utf8');

  // Variável para contar o número de linhas encontradas com o link
  let linesWithLinkCount = 0;

  // Evento 'data' é disparado quando há dados disponíveis para leitura
  readStream.on('data', chunk => {
    const lines = chunk.split('\n');

    // Filtrar as linhas que contêm o link
    const linesWithLink = lines.filter(line => line.includes(linkToFind));

    linesWithLinkCount += linesWithLink.length;

    // Limpar o console antes de exibir as informações
    console.clear();

    // Escrever as linhas encontradas no stream de gravação
    linesWithLink.forEach(line => {
      writeStream.write(line + '\n');
    });

    // Exibir a contagem de linhas com o link e o nome da opção
    console.log(`\nForam encontrados ${linesWithLinkCount} logins ${optionName}.`.green.bold);
  });

  // Evento 'end' é disparado quando a leitura do arquivo é concluída
  readStream.on('end', () => {
    writeStream.end();
    rl.close(); // Fechar a interface de leitura do terminal
  });

  // Evento 'error' é disparado se ocorrer algum erro na leitura ou gravação
  readStream.on('error', error => {
    console.error('\nErro na leitura do arquivo:'.red.bold, error);
    rl.close(); // Fechar a interface de leitura do terminal em caso de erro
  });

  writeStream.on('error', error => {
    console.error('\nErro na gravação do arquivo:'.red.bold, error);
    rl.close(); // Fechar a interface de leitura do terminal em caso de erro
  });
};

console.clear();
console.log(blue(`

                                        ██╗      ██████╗  ██████╗ ███████╗
                                        ██║     ██╔═══██╗██╔════╝ ██╔════╝
                                        ██║     ██║   ██║██║  ███╗███████╗
                                        ██║     ██║   ██║██║   ██║╚════██║
                                        ███████╗╚██████╔╝╚██████╔╝███████║
                                        ╚══════╝ ╚═════╝  ╚═════╝ ╚══════╝
                                  
                                                                                                                                                          
                                  `))


rl.question(`                                     Qual painel você deseja procurar:

                                            1. Cadsus
                                            2. SI-PNI
                                            3. Cortex MJ
                                            4. Credilink
                                            5. BigData
                                            6. Radar Serpro
                                            7. Cerebrum Gov
                                            8. SISFAC
                                            9. SISREG III
                                            10. Policia Militar ES
                                            11. Exercito Brasileiro
                                            12. Portal PMERJ
                                            13. Policia Militar MG
                                            14. Portal ECV Detrannet
                                            15. SISP
                                            16. Sigma 2.0
                                            17. Outro (inserir link manualmente)\n`.brightGreen, option => {
  switch (option) {
    case '1':
      searchLink('cadastro.saude.gov.br', 'Cadsus');
      break;
    case '2':
      searchLink('si-pni.saude.gov.br', 'SI-PNI');
      break;
    case '3':
      searchLink('cortex.mj.gov.br', 'Cortex MJ');
      break;
    case '4':
      searchLink('confirmeonline', 'Credilink');
      break;
    case '5':
      searchLink('bigdatacorp.com.br', 'BigData');
      break;
    case '6':
      searchLink('radar.serpro.gov.br', 'Radar Serpro');
      break;
    case '7':
      searchLink('spi.sspds.ce.gov.br', 'Cerebrum Gov');
      break;
    case '8':
      searchLink('sisfac.policiacivil.pa.gov.br', 'SISFAC');
      break;
    case '9':
      searchLink('sisregiii.saude.gov.br', 'SISREG III');
      break;
    case '10':
      searchLink('portal.pm.es.gov.br', 'Policia Militar ES');
      break;
    case '11':
      searchLink('sermilweb.eb.mil.br', 'Exercito Brasileiro');
      break;
    case '12':
      searchLink('portal.pmerj.rj.gov.br', 'Portal PMERJ');
      break;
    case '13':
      searchLink('intranet.policiamilitar.mg.gov.br', 'Policia Militar MG');
      break;
    case '14':
      searchLink('portalecv.detrannet.sc.gov.br', 'Portal ECV Detrannet');
      break;
    case '15':
      searchLink('conecta.sisp.sc.gov.br', 'SISP');
      break;
    case '16':
      searchLink('sigma.ssp.ma.gov.br', 'Sigma 2.0');
      break;
    case '17':
      rl.question('Digite o link a ser procurado: '.brightBlue, linkToFind => {
        searchLink(linkToFind, 'Outro');
      });
      break;
    default:
      console.log('Opção inválida!'.red);
      rl.close();
  }
});
