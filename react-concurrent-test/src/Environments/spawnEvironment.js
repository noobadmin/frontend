import React from 'react'
import styled from 'styled-components'
import {Box, Card, Text} from 'rebass/styled-components'
import useSWR from 'swr'
import {v4 as uuid} from 'uuid'

const SpawnEnvironment = ({refresh}) => {
  const fetcher = url => fetch(url).then(r => r.json())
  const {data} = useSWR(process.env.REACT_APP_CLOUD + '/flavours', fetcher)
  console.log(uuid())
  const spawn = async flavour => {
    const payload = {
      flavour,
      name: toString('#' + uuid()),
    }
    await fetch(process.env.REACT_APP_CLOUD + '/instances', {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    //should be optimistic
    refresh()
  }
  return (
    <S.Box>
      {data.map(flavour => (
        <S.Card onClick={() => spawn(flavour)} key={flavour._id}>
          <Text>{flavour.name}</Text>
        </S.Card>
      ))}
    </S.Box>
  )
}

export default SpawnEnvironment

const S = {}
S.Box = styled(Box)`
  display: grid;
  grid-gap: ${props => props.theme.space[2]};
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`
S.Card = styled(Card)``

