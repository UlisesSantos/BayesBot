export class QuestionAutomata {
    constructor() {
      // Palabras clave para agricultura
      this.agricultureKeywords = [
        'cultivo', 'siembra', 'cosecha', 'semilla', 'plantación', 'riego',
        'fertilizante', 'pesticida', 'suelo', 'planta', 'fruta', 'verdura',
        'orgánico', 'clima', 'temporada', 'agricultura'
      ];
      
      // Palabras clave para exportación
      this.exportKeywords = [
        'exportación', 'exportar', 'comercio', 'internacional', 'mercado',
        'envío', 'aduana', 'aranceles', 'certificado', 'regulación',
        'embarque', 'logística', 'contenedor', 'puerto', 'importación'
      ];
      
      // Palabras de pregunta comunes
      this.questionWords = [
        'qué', 'cómo', 'cuándo', 'dónde', 'por qué', 'quién', 'cuál',
        'cuánto', 'cómo se'
      ];
    }
    
    matchQuestion(input) {
      const normalizedInput = input.toLowerCase();
      
      // Verificar si es una pregunta
      const isQuestion = this.questionWords.some(word => 
        normalizedInput.includes(word) || normalizedInput.endsWith('?')
      );
      
      // Verificar si está relacionado con agricultura
      const isAgriculture = this.agricultureKeywords.some(word => 
        normalizedInput.includes(word)
      );
      
      // Verificar si está relacionado con exportación
      const isExport = this.exportKeywords.some(word => 
        normalizedInput.includes(word)
      );
      
      // Retornar la categoría de la pregunta
      if (isQuestion) {
        if (isAgriculture && isExport) {
          return 'agriculture_export';
        } else if (isAgriculture) {
          return 'agriculture';
        } else if (isExport) {
          return 'export';
        }
      }
      
      return 'unknown';
    }
    
    extractKeyEntities(input) {
      const normalizedInput = input.toLowerCase();
      const entities = [];
      
      // Extraer palabras clave de agricultura
      this.agricultureKeywords.forEach(keyword => {
        if (normalizedInput.includes(keyword)) {
          entities.push({ type: 'agriculture', value: keyword });
        }
      });
      
      // Extraer palabras clave de exportación
      this.exportKeywords.forEach(keyword => {
        if (normalizedInput.includes(keyword)) {
          entities.push({ type: 'export', value: keyword });
        }
      });
      
      return entities;
    }
  }