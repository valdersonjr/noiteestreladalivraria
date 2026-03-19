export const strings = {
  site: {
    name: "Noite Estrelada",
    description: "Livraria online de livros novos e usados com entrega imediata.",
    location: "Goianésia - GO",
  },

  nav: {
    home: "Página Inicial",
    recommend: "Me recomende um livro",
    deals: "Ofertas",
    newBooks: "Livros Novos",
    usedBooks: "Livros Usados",
    howItWorks: "Como Funciona",
    about: "Sobre",
  },

  header: {
    searchPlaceholder: "Buscar por título ou autor...",
    cartLabel: "Carrinho",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    themeToggle: "Alternar tema",
  },

  cart: {
    title: "Meu Carrinho",
    empty: "Seu carrinho está vazio.",
    sendWhatsapp: "Enviar lista por WhatsApp",
  },

  catalog: {
    title: "Catálogo",
    empty: "Nenhum livro encontrado.",
    filters: {
      title: "Filtros",
      search: "Buscar por título ou autor",
      genre: "Gênero",
      condition: "Condição",
      conditionNew: "Novo",
      conditionUsed: "Usado",
      priceRange: "Faixa de preço",
      clear: "Limpar filtros",
    },
  },

  book: {
    condition: {
      new: "Novo",
      used: "Usado",
    },
    by: "por",
    unavailable: "Indisponível",
  },

  chat: {
    title: "Assistente",
    placeholder: "Pergunte sobre um livro ou peça uma indicação...",
    send: "Enviar",
    thinking: "Digitando...",
    errorMessage: "Não consegui processar sua mensagem. Tente novamente.",
  },

  about: {
    title: "Sobre",
  },

  howItWorks: {
    title: "Como Funciona",
    faq: "Perguntas Frequentes",
  },

  contact: {
    title: "Contato",
    whatsappLabel: "Fale conosco pelo WhatsApp",
  },

  footer: {
    tagline: "Sua livraria local com entrega imediata.",
    navTitle: "Navegação",
    contactTitle: "Contato",
    whatsapp: "Fale pelo WhatsApp",
    copyright: `© ${new Date().getFullYear()} Noite Estrelada. Todos os direitos reservados.`,
  },

  admin: {
    nav: {
      dashboard: "Dashboard",
      livros: "Livros",
      pessoas: "Pessoas",
      vendas: "Vendas",
      logout: "Sair",
    },
    login: {
      title: "Painel Admin",
      subtitle: "Acesso restrito",
      telefone: "Telefone",
      senha: "Senha",
      submit: "Entrar",
      loading: "Entrando...",
      error: "Telefone ou senha inválidos.",
    },
    dashboard: {
      title: "Dashboard",
      livrosDisponiveis: "Livros disponíveis",
      totalVendas: "Total de vendas",
      totalPessoas: "Pessoas cadastradas",
      faturamentoBruto: "Faturamento bruto",
      faturamentoLiquido: "Lucro total",
      vendasRecentes: "Vendas recentes",
    },
    livros: {
      title: "Livros",
      novo: "Novo livro",
      editar: "Editar",
      disponivel: "Disponível",
      indisponivel: "Indisponível",
      alternarDisponibilidade: "Alterar disponibilidade",
      excluir: "Excluir",
      confirmarExclusao: "Confirmar exclusão",
      confirmarExclusaoMsg: "Tem certeza que deseja excluir este livro? Esta ação não pode ser desfeita.",
      novoTitulo: "Novo Livro",
      editarTitulo: "Editar Livro",
      salvar: "Salvar",
      salvando: "Salvando...",
      campos: {
        titulo: "Título",
        autor: "Autor",
        preco: "Preço de venda (R$)",
        precoCompra: "Preço de compra (R$)",
        precoCompraHint: "Preencha apenas para livros próprios. Deixe em branco para consignação.",
        condicao: "Condição",
        novo: "Novo",
        usado: "Usado",
        descricao: "Descrição",
        foto: "URL da foto",
        generos: "Gêneros",
        vendedor: "Vendedor",
      },
    },
    pessoas: {
      title: "Pessoas",
      nova: "Nova pessoa",
      novaTitulo: "Nova Pessoa",
      editarTitulo: "Editar Pessoa",
      salvar: "Salvar",
      salvando: "Salvando...",
      editar: "Editar",
      excluir: "Excluir",
      confirmarExclusao: "Confirmar exclusão",
      confirmarExclusaoMsg: "Tem certeza que deseja excluir esta pessoa? As vendas vinculadas serão preservadas.",
      campos: {
        nome: "Nome",
        telefone: "Telefone",
        email: "E-mail (opcional)",
      },
    },
    vendas: {
      title: "Vendas",
      nova: "Nova venda",
      novaTitulo: "Nova Venda",
      salvar: "Registrar venda",
      salvando: "Registrando...",
      status: {
        pendente: "Pendente",
        concluida: "Concluída",
        cancelada: "Cancelada",
      },
      formasPagamento: {
        pix: "Pix",
        dinheiro: "Dinheiro",
      },
      repasse: "Registrar repasse",
      repasseFeito: "Repasse feito",
      alterarStatus: "Alterar status",
      campos: {
        livro: "Livro",
        comprador: "Comprador",
        preco: "Preço de venda (R$)",
        comissao: "Comissão (%)",
        entrega: "Taxa de entrega (R$)",
        pagamento: "Forma de pagamento",
        observacoes: "Observações",
      },
    },
    common: {
      cancelar: "Cancelar",
      confirmar: "Confirmar",
      carregando: "Carregando...",
      erro: "Erro ao carregar dados.",
      semDados: "Nenhum registro encontrado.",
    },
  },
} as const;
