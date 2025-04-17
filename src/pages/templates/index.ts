import TemplateFreeOne from './free/TemplateFreeOne.vue';
import TemplatePremiumOne from './premium/TemplatePremiumOne.vue';

export const templates = [
  {
    id: '1',
    name: 'Template Livre',
    type: 'free',
    component: TemplateFreeOne,
    disabled: false,
  },
  {
    id: '2',
    name: 'Template Premium',
    type: 'premium',
    component: TemplatePremiumOne,
    disabled: true,
  },
];
