//import { api } from './configs/axiosConfig';
//import { defineCancelApiObject } from './configs/axiosUtils';

export const bookApi = {
  getBooks: async function ( cancel = false) {
    // const response = await api.request({
    //   url: `${process.env.REACT_APP_BACKEND_URL}/book/all`, //PROVAVELMENTE MUDAR QUANDO IMPLEMENTAR BACKEND
    //   method: "GET",
    //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    // })
    const imageUrl = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22287%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20287%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18eee587f18%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18eee587f18%22%3E%3Crect%20width%3D%22287%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.6875%22%20y%3D%2296.20000038146972%22%3E287x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"

    var response = { //resposta mockada para testes, provavelmente vai mudar quando implementar o backend
      data: [
        { id: 1, title: "O Pequeno Príncipe", imageUrl: imageUrl, text: "Nesta história, um piloto cai com seu avião no deserto do Saara e encontra um pequeno príncipe, que o leva a uma aventura filosófica e poética através de planetas que encerram a solidão humana.", price: "16.00" },
        { id: 2, title: "O Senhor dos Anéis: Volume Único", imageUrl: imageUrl, text: "Durante a Segunda Era na Terra-média Sauron forjou o Um Anel em segredo. Após a Batalha da Última Aliança o anel foi tomado de Sauron por Isildur. Perdido por séculos, caiu nas mãos de Bilbo Bolseiro.", price: "100.00" },
        { id: 3, title: "Fundamentos da Física - Mecânica", imageUrl: imageUrl, text: "Eleito o melhor livro introdutório de Física do século XX pela APS Physics. Nova edição com testes, exemplos, revisão e mais de 300 problemas novos, além de conteúdo exclusivo para professores.", price: "200.00" },
        { id: 4, title: "A Game of Thrones", imageUrl: imageUrl, text: "A Game of Thrones é o primeiro livro da série de fantasia épica A Song of Ice and Fire, que se passa em Westeros e Essos e narra as violentas lutas pelo Trono de Ferro.", price: "45.00" },
        { id: 5, title: "Sapiens: Uma Breve História da Humanidade", imageUrl: imageUrl, text: "Sapiens aborda a história da humanidade, desde os primórdios até os dias atuais, explorando como o Homo sapiens se tornou a espécie dominante do planeta.", price: "38.90" },
        { id: 6, title: "Uma Breve História do Tempo", imageUrl: imageUrl, text: "Uma Breve História do Tempo é uma obra que discute questões de cosmologia e física teórica, apresentando conceitos complexos de forma acessível ao público leigo.", price: "55.00" },
        { id: 7, title: "Harry Potter e as Relíquias da Morte", imageUrl: imageUrl, text: "O sétimo e último livro da série Harry Potter, que narra a batalha final entre Harry Potter e Lord Voldemort, encerrando a saga do jovem bruxo.", price: "34.99" },
        { id: 8, title: "O Código Da Vinci", imageUrl: imageUrl, text: "O Código Da Vinci é um thriller que mistura arte, religião, simbologia e história, enquanto o professor Robert Langdon investiga um assassinato no Louvre e descobre uma conspiração.", price: "29.90" },
        { id: 9, title: "Assassinato no Expresso Oriente", imageUrl: imageUrl, text: "Um dos mais famosos romances policiais de Agatha Christie, onde o detetive Hercule Poirot investiga um assassinato ocorrido a bordo do luxuoso Expresso do Oriente.", price: "25.00" },
        { id: 10, title: "Androides Sonham com Ovelhas Elétricas?", imageUrl: imageUrl, text: "A obra que inspirou o filme Blade Runner, é um clássico da ficção científica que questiona a natureza da realidade e da humanidade em um mundo pós-apocalíptico.", price: "28.50" }
      ]
    }

    return response.data;
  },

  bookToCart: async function ( cartObject, cancel = false) {
    // const response = await api.request({
    //   url: `${process.env.REACT_APP_BACKEND_URL}/book/toCart?bookId=${cartObject.bookId}&bookQuantity=${cartObject.bookQuantity}&purchaseStatus=${cartObject.purchaseStatus}&bookValue=${cartObject.bookValue}&clientId=${cartObject.clientId}`,
    //   method: "POST",
    //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    // })

    const url = `${process.env.REACT_APP_BACKEND_URL}/book/toCart?bookId=${cartObject.bookId}&bookQuantity=${cartObject.bookQuantity}&purchaseStatus=${cartObject.purchaseStatus}&bookValue=${cartObject.bookValue}&clientId=${cartObject.clientId}`;
    console.log(url);
  }
}

//const cancelApiObject = defineCancelApiObject(bookApi)
