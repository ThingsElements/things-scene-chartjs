import { html } from '@polymer/polymer/polymer-element';
import { ThingsEditorProperty } from '@hatiolab/things-shell/things-module';

import './property-editor-chartjs-hbar';
import './property-editor-chartjs-mixed';
import './property-editor-chartjs-pie';
import './property-editor-chartjs-radar';

export default class ChartJSEditor extends ThingsEditorProperty {

  static get is() {
    return 'property-editor-chartjs';
  }

  static get editorTemplate() {
    return html`
    <dom-if if="[[isTypeOf(value.type, 'line')]]" restamp>
      <template>
        <property-editor-chartjs-mixed values="{{value}}" fullwidth>
        </property-editor-chartjs-mixed>
      </template>
    </dom-if>

    <template is="dom-if" if="[[isTypeOf(value.type, 'horizontalBar')]]" restamp>
      <property-editor-chartjs-hbar values="{{value}}" fullwidth>
      </property-editor-chartjs-hbar>
    </template>

    <template is="dom-if" if="[[isTypeOf(value.type, 'bar')]]" restamp>
      <property-editor-chartjs-mixed values="{{value}}" fullwidth>
      </property-editor-chartjs-mixed>
    </template>

    <template is="dom-if" if="[[isTypeOf(value.type, 'pie')]]" restamp>
      <property-editor-chartjs-pie values="{{value}}" fullwidth>
      </property-editor-chartjs-pie>
    </template>

    <template is="dom-if" if="[[isTypeOf(value.type, 'doughnut')]]" restamp>
      <property-editor-chartjs-pie values="{{value}}" fullwidth>
      </property-editor-chartjs-pie>
    </template>

    <template is="dom-if" if="[[isTypeOf(value.type, 'polarArea')]]" restamp>
      <property-editor-chartjs-pie values="{{value}}" fullwidth>
      </property-editor-chartjs-pie>
    </template>

    <template is="dom-if" if="[[isTypeOf(value.type, 'radar')]]" restamp>
      <property-editor-chartjs-radar values="{{value}}" fullwidth>
      </property-editor-chartjs-radar>
    </template>
    `;
  }

  isTypeOf(is, type) {
    return is == type;
  }
}

customElements.define(ChartJSEditor.is, ChartJSEditor);