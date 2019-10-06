import styled from '@emotion/styled'

import * as colors from '../../components/UI/Colors/Colors'

interface IColor {
  primary: string,
  secondary: string
}

interface IBorder {
  style: string,
  radius: string
}

interface IMargin {
  all: string
}

export interface IGridComponents {
  system: {
    name: string,
  },
  messages: {
    name: string,
  },
  users: {
    name: string,
  },
  controls: {
    name: string,
  },
  global: {
    colors: IColor,
    border: IBorder,
    margin: IMargin
  }
}

export const GridContainer = styled.div`
  margin: 15px;
  padding: 5px;
  min-width: 600px;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.25);
  display: grid;
  grid-template:
  [row-1] "main users" 600px
  [row-2] "controls controls" auto [row-3] /
  [col-1] auto [col-2] 170px [col-3];
`

// grid-area values for each 'GridItem' component. Values of each constant should correspond to those defined GridContainer -> grid-template
const systemGridName: string = 'row-1 / col-1 / row-2 / col-3'
const messagesGridName: string = 'main'
const usersGridName: string = 'users'
const controlsGridName: string = 'controls'

// css values for css properties
const borderStyle: string = `1px solid ${colors.componentBorderColor}`
const borderRadius: string = '15px'
const margins: string = '5px'

// object definitions with a set of values to be used with single or multiple CSS declarations.
// used by default in 'gridComponents' as sub objects.
const color: IColor = {
  primary: colors.primaryColor,
  secondary: colors.secondaryColor
}

const border: IBorder = {
  style: borderStyle,
  radius: borderRadius,
}

const margin: IMargin = {
  all: margins
}

// object containing CSS properties for each 'GridItem' component
export const gridComponents: IGridComponents = {
  system: {
    name: systemGridName,
  },
  messages: {
    name: messagesGridName,
  },
  users: {
    name: usersGridName,
  },
  controls: {
    name: controlsGridName,
  },
  global: {
    colors: color,
    border: border,
    margin: margin
  }
}

export default {
  GridContainer,
  gridComponents,
}