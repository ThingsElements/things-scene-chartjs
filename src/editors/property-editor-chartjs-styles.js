import { css } from 'lit-element'

export const PropertyEditorChartJSStyles = css`
  :host {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-gap: 5px;
  }

  :host > * {
    box-sizing: border-box;
    grid-column: span 7;
  }

  :host > label {
    box-sizing: border-box;
    grid-column: span 3;
  }

  :host > legend {
    box-sizing: border-box;
    grid-column: 1 / -1;
    color: #e46c2e;
    font-size: 11px;
    font-weight: bold;
    text-transform: capitalize;
  }

  #series-properties-container {
    display: grid;
    grid-template-columns: 1fr 25px;
    align-items: center;
    justify-content: center;
  }

  #series-properties-container > iron-pages {
    grid-column: span 2;
  }

  #tab-header {
    display: grid;
    grid-template-columns: 25px 1fr 25px;
    grid-gap: 5px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 0;
    background-color: #ccc;
    box-sizing: border-box;
    padding-top: 3px;
    align-items: center;
  }

  #tab-header > paper-tabs {
    height: 25px;
  }

  #tab-header > paper-icon-button {
    padding: 0px;
    width: 25px;
    height: 25px;
  }

  #tab-header paper-tabs paper-icon-button {
    display: flex;
    margin-left: 5px;
    width: 15px;
    height: 15px;
    padding: 2px;
    color: #585858;
  }

  #add-series-button-container {
    height: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    padding-top: 3px;
    display: flex;
    border-bottom: rgba(0, 0, 0, 0.2) 1px solid;
  }

  #add-series-button {
    width: 20px;
    height: 20px;
    padding: 0;
    color: var(--primary-text-color);
  }

  .tab-content {
    background-color: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-width: 0 1px 1px 1px;
    padding: 5px;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-gap: 5px;
  }

  .tab-content > * {
    box-sizing: border-box;
    grid-column: span 7;
  }

  label,
  .tab-content > label {
    grid-column: span 3;
    text-align: right;
    color: var(--primary-text-color);
    font-size: 0.8em;
    line-height: 2;
    text-transform: capitalize;
  }

  input[type='checkbox'],
  .tab-content > input[type='checkbox'] {
    grid-column: span 4;
    justify-self: end;
    align-self: center;
  }

  input[type='checkbox'] + label,
  .tab-content > input[type='checkbox'] + label {
    grid-column: span 6;

    text-align: left;
  }

  [fullwidth] {
    grid-column: 1 / -1;
    margin: 0;
    border: 0;
  }

  select {
    border: #ccc 1px solid;
    background: url(/images/bg-input-select.png) 100% 50% no-repeat #fff;
  }

  things-editor-script {
    width: 94%;
    height: 300px;
    margin: 0 0 7px 7px;
    overflow: auto;
  }

  paper-tab {
    background-color: rgba(0, 0, 0, 0.2);
    background-color: #ccc;
    border-width: 1px 1px 0 1px;
    padding: 0 5px;
    color: #fff;
    font-size: 13px;
    box-sizing: border-box;
    min-width: 45px;
  }

  paper-tab[disabled] {
    background-color: rgba(0, 0, 0, 0.1);
  }

  paper-tab:last-child {
    border-width: 0;
  }

  paper-tabs paper-tab.iron-selected {
    background-color: #f6f8f9;
    border-radius: 5px 5px 0 0;
    color: #585858;
  }
`
