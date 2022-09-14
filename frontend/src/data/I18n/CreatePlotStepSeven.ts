export default {
  pt: {
    CreatePlotStepSeven: {
      title: 'Amostra 1',
      subtitle:
        'Colete duas plantas de um ponto aleatorio do talhão \n (guarde as plantas para o ultimo passo)',
      sampleA: 'Quantidade total de grãos na planta A',
      sampleB: 'Quantidade total de grãos na planta B',
      samplePlaceholder: 'Digite a quantidade de grãos',
      sampleDescription: 'Descrição (opcional)',
      sampleDescriptionPlaceholder: 'Descreva aqui...',
      buttonTitle: 'Continuar',
      errors: {
        grainsPlant: {
          required: 'Quantidade é obrigatória',
          min: 'Quantidade de grãos não pode ser "ZERO"'
        }
      }
    }
  },
  en: {
    CreatePlotStepSeven: {
      title: 'Sample 1',
      subtitle:
        'Collect two plants from a random spot in the field \n (save the plants for the last step)',
      sampleA: 'Total amount of grains in plant A',
      sampleB: 'Total amount of grains in plant B',
      samplePlaceholder: 'Enter the amount of beans',
      sampleDescription: 'Description (optional)',
      sampleDescriptionPlaceholder: 'Describe here...',
      buttonTitle: 'Continue',
      errors: {
        grainsPlant: {
          required: 'Quantity is required',
          min: 'Grain quantity cannot be "ZERO"'
        }
      }
    }
  }
};
