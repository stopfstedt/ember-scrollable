import Ember from 'ember';
import FeatureForm from 'phoenix/forms/feature-form';
import { request } from 'ic-ajax';

export default Ember.Route.extend({
  currentUser: Ember.inject.service(),
  titleToken: 'New Feature',

  model: function() {
    return Ember.RSVP.hash({
      badges: request(`${EmberENV.apiBaseUrl}/badges`).badges,
      feature: this.store.createRecord('feature', {
        owner: this.get('currentUser.model')
      })
    });
  },

  setupController: function(controller, models) {
    controller.setProperties({
      model: models.feature,
      featureForm: FeatureForm.create({
        model: models.feature,
        container: this.get('container'),
        badges: models.badges
      })
    });
  }
});
