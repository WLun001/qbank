interface Question {
  SurveyID: string;
  Element: string;
  PrimaryAttribute: string;
  SecondaryAttribute: string;
  TertiaryAttribute?: any;
  Payload: Payload;
}

interface Payload {
  QuestionText: string;
  DefaultChoices: boolean;
  DataExportTag: string;
  QuestionType: string;
  Selector: string;
  Configuration: Configuration;
  QuestionDescription: string;
  ChoiceOrder: any[];
  Validation: Validation;
  GradingData: any[];
  Language: any[];
  QuestionID: string;
  QuestionText_Unsafe: string;
}

interface Validation {
  Settings: Settings;
}

interface Settings {
  Type: string;
}

interface Configuration {
  QuestionDescriptionOption: string;
}
