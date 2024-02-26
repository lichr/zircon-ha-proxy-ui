export const border = '1px solid #ddd';
export const noneBorder = '1px solid #fff';

export const vbox: any = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start'
};

export const hbox: any = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start'
};

export const row: any = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start'
};

export const center: any = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
};

export const cbox: any = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
};

export const wbox: any = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start'
};

export const fit: any = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%'
};

export const font: any = {
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
};

export const mono: any = {
  fontFamily: "'Lucida Console', monospace"
};

export const p: any = {
  ...font,
  fontSize: '14px'
}

export const click: any = {
  cursor: 'pointer',
  backgroundColor: 'white',
  userSelect: 'none',
  '&:hover': {
    backgroundColor: '#2196f311'
  }
}
