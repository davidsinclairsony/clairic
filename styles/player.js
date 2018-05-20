import css from 'styled-jsx/css';
import { spacing, bps } from './base';

// prettier-ignore
export default css`
  .root {
    padding-left: ${spacing.medium}px;
    padding-right: ${spacing.medium}px;
    padding-top: ${spacing.medium}px;
    padding-bottom: ${spacing.medium}px;
    background:
      linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.02) 100%);
    display: grid;
    grid-template-columns: 0px 1fr;

    &.video {
      grid-gap: ${spacing.large}px;
      grid-template-columns: 120px 1fr;

      &.is-full-screen {
        :global(.player) {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9;
          width: 100% !important;
          height: 100% !important;
          text-align: center;
          max-width: 100%;
        }
      }
    }

    :global(.player) {
      overflow: hidden;
      cursor: pointer;
      background: black;
    }

    :global(.player video) {
      object-fit: contain;
      width: 100% !important;
      height: 100% !important;
    }

    .main {
      display: grid;
      grid-column-gap: ${spacing.large}px;
      grid-row-gap: ${spacing.medium}px;
      grid-template-rows: auto;

      .directions {
        display: grid;
        grid-template-columns: auto;
        grid-auto-columns: auto;
        grid-auto-flow: column;
        align-items: center;
        grid-area: directions;
        grid-gap: ${spacing.small}px;
      }

      .control {
        display: grid;
        align-items: center;
        grid-template-columns: auto auto 1fr;
        grid-gap: ${spacing.medium}px;
        max-width: 400px;

        &.sound {
          grid-area: sound;
        }

        &.progress {
          grid-area: progress;
        }
      }

      .info {
        grid-area: info;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    @media (max-width: ${bps.medium - 1}px) {
      .main {
        display: grid;
        grid-column-gap: ${spacing.large}px;
        grid-row-gap: ${spacing.medium}px;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto;
        grid-template-areas:
          "directions sound"
          "progress progress"
          "info info";

        .control {
          &.sound {
            max-width: 280px;
          }
        }
      }
    }

    @media (min-width: ${bps.medium}px) {
      .main {
        grid-template-columns: auto 200px 1fr;
        grid-template-areas:
          "directions sound progress"
          "info info info";
      }
    }
  }
`;