import { Injectable } from '@angular/core';
import { Language } from '../models/Preference';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private static readonly substituteMaps: Record<
    string,
    Record<string, string>
  > = {};

  // Use ISO 639-1 standard for language codes,
  //  see https://www.andiamo.co.uk/resources/iso-language-codes/
  static getLanguageISO(language: Language): string {
    switch (language) {
      case Language.ENGLISH_BRITISH:
        return 'en-gb';
      case Language.ENGLISH_AMERICAN:
        return 'en-us';
      case Language.ENGLISH_200:
        return 'en-gb';
      default:
        return 'unknown';
    }
  }

  static getLanguageString(language: Language): string {
    switch (language) {
      case Language.ENGLISH_BRITISH:
        return 'English (UK)';
      case Language.ENGLISH_AMERICAN:
        return 'English (US)';
      case Language.ENGLISH_200:
        return 'English (200)';
    }
  }

  static compareCharacter(
    actual: string,
    expected: string,
    language: Language,
    ignoreAccents = false
  ): boolean {
    if (!actual || !expected) return false;
    if (actual.length !== expected.length) return false;
    if (!ignoreAccents) return actual === expected;

    return (
      actual === expected || actual === this.getSubstitute(expected, language)
    );
  }

  private static getSubstitute(char: string, language: Language) {
    const isUpper = char === char.toUpperCase();
    const substituteMap: Record<string, string> = this.substituteMaps[language];

    if (substituteMap) {
      const substitute = substituteMap[char.toLowerCase()];

      if (substitute) return isUpper ? substitute.toUpperCase() : substitute;
    }

    return char;
  }

  static compare(
    actual: string,
    expected: string,
    language: Language,
    ignoreAccents = false
  ): boolean {
    if (typeof actual !== 'string' || typeof expected !== 'string')
      return false;
    if (actual.length !== expected.length) return false;

    const length = actual.length;

    for (let i = 0; i < length; i++) {
      if (
        !this.compareCharacter(actual[i], expected[i], language, ignoreAccents)
      ) {
        return false;
      }
    }

    return true;
  }
}
