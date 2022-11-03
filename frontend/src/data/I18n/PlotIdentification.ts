export default {
  pt: {
    PlotIdentification: {
      title: 'Identifique o talhão',
      subtitle: 'Insira um nome e uma descrição para o seu novo talhão',

      fieldPropertyLabel: 'Propriedade do talhão',
      fieldPropertyPlaceholder: 'Selecione a propriedade do talhão',

      fieldName: 'Nome do talhão',
      fieldNamePlaceholder: 'Digite um nome para o talhão',

      fieldDate: 'Data de plantio',
      fieldDatePlaceholder: 'Insira a data de plantio',

      fieldCropYear: 'Ano safra',
      fieldCropYearPlaceholder: 'ex: 2021-2022',

      fieldDescription: 'Descrição',
      fieldDescriptionPlaceholder: 'Digite uma descrição',

      continueButton: 'Continuar',
      errors: {
        stepTwoName: {
          required: 'Nome é obrigatório'
        }
      },
      nameRequired:'Nome é obrigatório',
      date:'Data de plantio é obrigatória',
      format:'Formato invalido ex: 2019/2020)',
      finishButton:'Finalizar',
      property:'Propriedade é obrigatória',
      createPlot:('Não foi possível criar o talhão')
    }
  },
  en: {
    PlotIdentification: {
      title: 'Identify the field',
      subtitle: 'Enter a name and description for your new field',

      fieldPropertyLabel: "Select  property's field",
      fieldPropertyPlaceholder: "Select property's field",

      fieldName: "Field's name",
      fieldNamePlaceholder: 'Enter a name for the field',

      fieldDate: 'Plating date',
      fieldDatePlaceholder: 'Enter planting date',

      fieldCropYear: 'Crop year',
      fieldCropYearPlaceholder: 'ex: 2021-2022',

      fieldDescription: 'Description',
      fieldDescriptionPlaceholder: 'Enter a description',
      continueButton: 'Continue',
      errors: {
        stepTwoName: {
          required: 'Name is required'
        }
      },
      nameRequired:'Required name',
      date:'Planting date is required',
      format:'Invalid format ex: 2019/2020',
      finishButton:'Finish',
      property:'Properties required',
      createPlot:('Not possible create plot')
    }
  }
};
