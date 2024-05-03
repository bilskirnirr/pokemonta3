/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class Pokemonta3Actor extends Actor {
  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * Augment the actor source data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as stat modifiers rather than stat scores) and should be
   * available both inside and outside of trainer sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.pokemonta3 || {};

    // Make separate methods for each Actor type (trainer, npc, etc.) to keep
    // things organized.
    this._prepareTrainerData(actorData);
    this._prepareNpcData(actorData);
    this._preparePokemonData(actorData);
  }

  /**
   * Prepare Trainer type specific data
   */
  _prepareTrainerData(actorData) {
    if (actorData.type !== 'trainer') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;

    // Loop through stat scores, and add their modifiers to our sheet output.
    for (let [key, stat] of Object.entries(systemData.stats)) {
      // Calculate the modifier using d20 rules.
      stat.mod = Math.floor((stat.value) / 2);
    }
  }

    /**
   * Prepare pokemon type specific data
   */
    _preparePokemonData(actorData) {
      if (actorData.type !== 'pokemon') return;
  
      // Make modifications to data here. For example:
      const systemData = actorData.system;
  
      // Loop through stat scores, and add their modifiers to our sheet output.
      for (let [key, stat] of Object.entries(systemData.stats)) {
        // Calculate the modifier using d20 rules.
        stat.mod = Math.floor((stat.value) / 2);
      }
    }

  /**
   * Prepare NPC type specific data.
   */
  _prepareNpcData(actorData) {
    if (actorData.type !== 'npc') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;
    systemData.xp = systemData.cr * systemData.cr * 100;
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    // Starts off by populating the roll data with `this.system`
    const data = { ...super.getRollData() };

    // Prepare trainer roll data.
    this._getTrainerRollData(data);
    this._getNpcRollData(data);
   // this._getPokemonRollData(data); <<<<<<<<<<< Somehow this fucking breaks the sheets???

    return data;
  }

  /**
   * Prepare trainer roll data.
   */
  _getTrainerRollData(data) {
    if (this.type !== 'trainer') return;

    // Copy the stat scores to the top level, so that rolls can use
    // formulas like `@atk.mod + 4`.
    if (data.stats) {
      for (let [k, v] of Object.entries(data.stats)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    // Add level for easier access, or fall back to 0.
    if (data.attributes.level) {
      data.lvl = data.attributes.level.value ?? 0;
    }
  }

    /**
   * Prepare pokemon roll data.
   */
    _getPokemonRollData(data) {
      if (this.type !== 'pokemon') return;
  
      // Copy the stat scores to the top level, so that rolls can use
      // formulas like `@atk.mod + 4`.
      if (data.stats) {
        for (let [k, v] of Object.entries(data.stats)) {
          data[k] = foundry.utils.deepClone(v);
        }
      }
  
      // Add level for easier access, or fall back to 0.
      if (data.attributes.level) {
        data.lvl = data.attributes.level.value ?? 0;
      }
    }

  /**
   * Prepare NPC roll data.
   */
  _getNpcRollData(data) {
    if (this.type !== 'npc') return;

    // Process additional NPC data here.
  }
}
