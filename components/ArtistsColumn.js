import { connect } from 'react-redux'

import { simplePluralize } from '../lib/utils'

import Column from './Column'
import Row from './Row'
import RowHeader from './RowHeader'

const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const ArtistsColumn = ({ artists = {}, artistSlug }) => (
  <Column heading="Artists">
    {artists && artists.data && Object.entries(groupBy(Object.values(artists.data), 'featured')).sort(([a], [b]) => b - a).map(([type, artists]) =>
      [
        <RowHeader key={type}>{type === '1' ? 'Featured' : 'Bands'}</RowHeader>,
        artists.map(artist =>
          <Row key={artist.id} href={`/${artist.slug}`} active={artist.slug === artistSlug}>
            <div>{artist.name}</div>
            <div>
              <div>{simplePluralize('show', artist.show_count)}</div>
              <div>{simplePluralize('tape', artist.source_count)}</div>
            </div>
          </Row>
        )
      ]
    )}
  </Column>
)

const mapStateToProps = ({ artists, app }) => ({ artists, artistSlug: app.artistSlug })

export default connect(mapStateToProps)(ArtistsColumn)
