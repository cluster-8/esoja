export default {
  pt: {
    CreatePlotStepTwo: {
      title: 'Identifique o talhão',
      subtitle: 'Insira um nome e uma descrição para o seu novo talhão',
      defaultValueLabel: 'Selecione a propriedade',
      fieldName: 'Nome',
      fieldNamePlaceholder: 'Digite um nome para o talhão',
      plantingDateLabel: 'Data de plantio',
      plantingDatePlaceholder: 'Data do plantio',
      cropYearLabel: 'Ano safra',
      cropYearPlaceholder: 'Informe o ano safra',
      fieldDescription: 'Descrição',
      fieldDescriptionPlaceholder: 'Digite uma descrição',
      continueButton: 'Continuar',
      errors: {
        stepTwoName: {
          required: 'Nome é obrigatório'
        },
        plantingDate: {
          required: 'Data de plantio é obrigatória'
        },
        cropYear: {
          required: 'Ano Sagra é obrigatório',
          min: 'Formato inválido! (ex: 2019/2020)'
        }
      }
    }
  },


  en: {
    CreatePlotStepTwo: {
      title: 'Identify the field',
      subtitle: 'Enter a name and description for your new field',
      defaultValueLabel: 'Select a property',
      fieldName: 'Name',
      fieldNamePlaceholder: 'Enter a name for the field',
      PlantingDateLabel: 'Planting data',
      PlantingDatePlaceholder: 'Planting Date',
      cropYearLabel: 'Year crop',
      cropYearPlaceholder: 'Enter the crop year',
      fieldDescription: 'Description',
      fieldDescriptionPlaceholder: 'Enter a description',
      continueButton: 'Continue',
      errors: {
        stepTwoName: {
          required: 'Name is required'
        },
        plantingDate: {
          required: 'Planting data is required'
        },
        cropYear: {
          required: 'Sacred Year is required',
          min: 'Invalid format! (eg: 2019/2020)'
        }
      }
    }
  }
};
