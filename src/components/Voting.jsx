import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Winner from './Winner';
import Vote from './Vote';


const Voting = React.createClass({
	mixins: [PureRenderMixin],
    render: function() {
      	return <div>
        {this.props.winner ?
          	<Winner ref="winner" winner={this.props.winner} /> :
          	<Vote {...this.props} />}
      	</div>;
    }
});

 export default Voting;