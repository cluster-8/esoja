export default {
  pt: {
    CreatePlotStepOne: {
      title: 'Coordenadas do talhão',
      subtitle: 'Marque no mapa a localização e area correspondente ao talhão',
      questionTitle: 'Como deseja prosseguir?',
      buttonTitlePolygon: 'Desenhar talhão no mapa',
      buttonMessagePolygon: 'marque todos os pontos do talhão e calcularemos a área automaticamente',
      buttonTitlePoint: 'Marcar ponto único',
      buttonMessagePoint: 'marque o ponto central do talhão e a area manualmente',
      ContinueButton: 'Continuar',
      ModeText: 'Alterar modo',
      areaLabel: 'Area',
      areaPlaceholder: 'Area do talhão em ha',
      errors: {
        polygonAlert: {
          localFormat: 'Localização inválida',
          map: 'Marque o talhão no mapa',
          min: 'Marque no mínimo 3 pontos ou escolha o modo ponto único',
          fieldFormat: 'Talhão inválido'
        },
        areaTotal: {
          required: 'Quantidade é obrigatória'
        }
      }
    }
  },
  en: {
    CreatePlotStepOne: {
      title: 'Field coordinates',
      subtitle: 'Mark on the map the location and area corresponding to the field',
      questionTitle: 'How do you want to proceed?',
      buttonTitlePolygon: 'Draw field on map',
      buttonMessagePolygon: 'mark all points in the field and we will calculate the area automatically',
      buttonTitlePoint: 'Mark single point',
      buttonMessagePoint: 'mark field midpoint and area manually',
      ContinueButton: 'Continue',
      ModeText: 'Change mode',
      areaLabel: 'Area',
      areaPlaceholder: 'Field area in ha',
      errors: {
        polygonAlert: {
          localFormat: 'Invalid location',
          map: 'Mark field on map',
          min: 'Score at least 3 points or choose single point mode',
          fieldFormat: 'Invalid field'
        },
        areaTotal: {
          required: 'Quantity is required'
        }
      }
    }
  }
};
