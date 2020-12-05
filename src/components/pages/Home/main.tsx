import React from 'react'
import { NextPage } from 'next'
import DefaultLayout from '@/components/templates/default'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '@/redux/counter/reducer'
import { update, reset } from '@/redux/form/reducer'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
)

const Main: NextPage = () => {
  const PAYLOAD_COUNT = 1
  const classes = useStyles()

  const dispatch = useDispatch()
  const { counter, form } = useSelector((state) => state)
  const countUp = () => {
    dispatch(increment(PAYLOAD_COUNT))
  }

  const countDown = () => {
    dispatch(decrement(PAYLOAD_COUNT))
  }

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value
    dispatch(update({ keyword: value, order_by: '1' }))
  }

  const onReset = () => {
    dispatch(reset())
  }

  return (
    <DefaultLayout>
      <React.Fragment>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div>
                <input type="text" value={form.keyword} onChange={onChange} />
                <button onClick={onReset}>リセット</button>
              </div>
              <Paper className={classes.paper}>
                <p>You clicked {counter.num} times</p>
                <button onClick={countUp}>INCREMENT</button>
                <button onClick={countDown}>DECREMENT</button>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    </DefaultLayout>
  )
}

export default Main