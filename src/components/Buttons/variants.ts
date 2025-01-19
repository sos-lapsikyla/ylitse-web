import { palette } from '../constants';
import ArchivedChatsIcon from '@/static/icons/archived-chats.svg';
import ArchiveIcon from '@/static/icons/archive.svg';
import BackIcon from '@/static/icons/back.svg';
import BlockIcon from '@/static/icons/block.svg';
import BlockedChatsIcon from '@/static/icons/blocked-chats.svg';
import CloseIcon from '@/static/icons/close.svg';
import CloseWithBackgroundIcon from '@/static/icons/close-with-background.svg';
import DangerIcon from '@/static/icons/danger.svg';
import DeleteIcon from '@/static/icons/delete.svg';
import DownIcon from '@/static/icons/down.svg';
import EditIcon from '@/static/icons/edit.svg';
import FilterIcon from '@/static/icons/filter.svg';
import ForwardIcon from '@/static/icons/forward.svg';
import MenuDotsIcon from '@/static/icons/menu-dots.svg';
import MenuLinesIcon from '@/static/icons/menu-lines.svg';
import NextIcon from '@/static/icons/next.svg';
import PrevIcon from '@/static/icons/prev.svg';
import ReturnIcon from '@/static/icons/return.svg';
import RewindIcon from '@/static/icons/rewind.svg';
import SearchIcon from '@/static/icons/search.svg';
import SearchWithBackgroundIcon from '@/static/icons/search-with-background.svg';
import SendIcon from '@/static/icons/send.svg';
import TooltipIcon from '@/static/icons/tooltip.svg';

export type ButtonVariant = keyof typeof variants;

export const variants = {
  danger: {
    backgroundColor: palette.redLight,
    color: palette.redDark,

    ['&: focus']: {
      outline: `1px solid ${palette.redDark}`,
      outlineOffset: '3px',
    },
  },
  dark: {
    backgroundColor: palette.purple,
    color: palette.orange,

    ['&: active, &: visited']: {
      backgroundColor: palette.purpleMid,
      color: palette.orange2,
      outline: 'none',
    },
    ['&: focus']: {
      outline: `1px solid ${palette.purple}`,
      outlineOffset: '3px',
    },
    ['&: hover']: {
      backgroundColor: palette.purpleDark,
    },
  },
  disabled: {
    backgroundColor: palette.greyMid,
    color: palette.greyFaded,
    cursor: 'not-allowed',

    ['&: active, &: visited']: {
      outline: 'none',
    },
    ['&: focus']: {
      outline: 'none',
    },
    ['&: hover']: {
      outline: `none`,
    },
  },
  disabledOutline: {
    background: 'none',
    border: `2px solid ${palette.greyFaded}`,
    color: palette.greyFaded,
    cursor: 'not-allowed',

    ['&: active, &: visited']: {
      outline: 'none',
    },
    ['&: focus']: {
      outline: 'none',
    },
    ['&: hover']: {
      outline: `none`,
    },
  },
  light: {
    backgroundColor: palette.white,
    border: `2px solid ${palette.purple}`,
    color: palette.purple,

    ['&: active, &: visited']: {
      outline: 'none',
    },
    ['&: focus']: {
      outline: 'none',
    },
    ['&: hover']: {
      border: `2px solid ${palette.purpleDark}`,
      color: palette.purpleDark,
      outline: `none`,
    },
  },
  outlineOrange: {
    background: 'none',
    border: `2px solid ${palette.orange}`,
    color: palette.orange,

    ['&: active, &: visited']: {
      backgroundColor: palette.purpleMid,
      color: palette.orange2,
      outline: 'none',
    },
    ['&: hover']: {
      backgroundColor: palette.purpleDark,
    },
  },
  outlinePurple: {
    background: 'none',
    border: `2px solid ${palette.purple}`,
    color: palette.purple,
  },
  textOnly: {
    background: 'none',
    color: palette.purple,
    padding: 0,
  },
};

export const iconVariants = {
  archive: `url(${ArchiveIcon})`,
  archivedChats: `url(${ArchivedChatsIcon})`,
  back: `url(${BackIcon})`,
  block: `url(${BlockIcon})`,
  blockedChats: `url(${BlockedChatsIcon})`,
  close: `url(${CloseIcon})`,
  closeWithBackground: `url(${CloseWithBackgroundIcon})`,
  danger: `url(${DangerIcon})`,
  delete: `url(${DeleteIcon})`,
  down: `url(${DownIcon})`,
  edit: `url(${EditIcon})`,
  filter: `url(${FilterIcon})`,
  forward: `url(${ForwardIcon})`,
  menuDots: `url(${MenuDotsIcon})`,
  menuLines: `url(${MenuLinesIcon})`,
  next: `url(${NextIcon})`,
  prev: `url(${PrevIcon})`,
  return: `url(${ReturnIcon})`,
  rewind: `url(${RewindIcon})`,
  search: `url(${SearchIcon})`,
  searchWithBackground: `url(${SearchWithBackgroundIcon})`,
  send: `url(${SendIcon})`,
  tooltip: `url(${TooltipIcon})`,
};

export type ButtonIcon = keyof typeof iconVariants;
