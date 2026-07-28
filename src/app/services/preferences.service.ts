import { Injectable } from '@angular/core';
import {
  Preference,
  Preferences,
  Language,
  Theme,
  WordMode,
  TextSize,
} from '../models/Preference';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  private defaults: Preferences = {
    [Preference.THEME]: Theme.DARK,
    [Preference.LANGUAGE]: Language.ENGLISH_200,
    [Preference.FOLLOW_SYSTEM_THEME]: false,
    [Preference.WORD_MODE]: WordMode.WORDS,
    [Preference.REVERSE_SCROLL]: false,
    [Preference.DEFAULT_TEST_DURATION]: 10,
    [Preference.TEXT_SIZE]: TextSize.MEDIUM,
    [Preference.SMOOTH_SCROLLING]: true,
    [Preference.SCROLLING_ANIMATION]: true,
    [Preference.IGNORE_DIACRITICS]: false,
    [Preference.IGNORE_CASING]: false,
  };

  private preferenceTypes: Record<string, unknown> = {
    [Preference.THEME]: Theme,
    [Preference.LANGUAGE]: Language,
    [Preference.FOLLOW_SYSTEM_THEME]: 'boolean',
    [Preference.WORD_MODE]: WordMode,
    [Preference.REVERSE_SCROLL]: 'boolean',
    [Preference.DEFAULT_TEST_DURATION]: 'number',
    [Preference.TEXT_SIZE]: TextSize,
    [Preference.SMOOTH_SCROLLING]: 'boolean',
    [Preference.SCROLLING_ANIMATION]: 'boolean',
    [Preference.IGNORE_DIACRITICS]: 'boolean',
    [Preference.IGNORE_CASING]: 'boolean',
  };

  private preferencesSubjects = new Map<string, BehaviorSubject<any>>();

  constructor() {
    this.setDefaultPreferences();
  }

  private setDefaultPreferences() {
    // Set default preferences
    for (const defaultPreference in this.defaults) {
      this.preferencesSubjects.set(
        defaultPreference,
        new BehaviorSubject(this.defaults[defaultPreference])
      );
    }
  }

  private validatePreferenceType(key: string, value: unknown) {
    const type = this.preferenceTypes[key];

    return (
      typeof type === 'undefined' ||
      (typeof type === 'string'
        ? typeof value === type
        : Object.values(type).includes(value))
    );
  }

  getPreferences(): Map<string, BehaviorSubject<any>> {
    return new Map(this.preferencesSubjects);
  }

  getPreference(key: Preference): any {
    const subject = this.preferencesSubjects.get(key);
    return subject?.value;
  }

  setPreference(key: Preference, value: unknown): void {
    if (!this.validatePreferenceType(key, value)) return;

    // Retrieve preferences object
    let pref: Preferences;

    try {
      pref = JSON.parse(localStorage.getItem('preferences'));
      if (pref == null || typeof pref === 'undefined') throw null;
    } catch (e) {
      pref = {};
    }

    pref[key as string] = value;

    localStorage.setItem('preferences', JSON.stringify(pref));

    this.preferencesSubjects.get(key).next(value);
  }

  clearPreferences(): void {
    if (localStorage.getItem('preferences') !== null) {
      localStorage.removeItem('preferences');
      for (const defaultPreference in this.defaults) {
        this.preferencesSubjects
          .get(defaultPreference)
          .next(this.defaults[defaultPreference]);
      }
    }
  }
}
