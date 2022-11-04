import React from 'react'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

export default function Squelleton({ valeur }) {
  let value = parseInt(valeur)

  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      {value === 1 && <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
      {value === 2 && <Skeleton variant="circular" width={100} height={100} />}
      {value === 3 && (
        <div style={{ height: '100%', position: 'relative', margin: '20px' }}>
          <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
        </div>
      )}
      {value === 4 && <Skeleton variant="rounded" width={210} height={100} />}

      {/* For other variants, adjust the size with `width` and `height` */}
    </Stack>
  )
}
