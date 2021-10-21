import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);

    // Fix the warning
    /**
     * Warning: Can't perform a React state update on an unmounted component.
     * This is a no-op, but it indicates a memory leak in your application.
     * To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
     */
    this.profileGithubRef = React.createRef();

    this.state = {
      clientID: '53da51a5c4f66c79eadb',
      clientSecret: '088fa798067f55e7a410bc8168bc4e172399b03e',
      count: 5,
      sort: 'created: asc',
      repos: [],
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientID, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientID}&client_secret=${clientSecret}`,
    )
      .then((res) => res.json())
      .then((data) => {
        // Fix the warning above.
        if (this.profileGithubRef.current) {
          this.setState({ repos: data });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { repos } = this.state;

    const repoItems = repos.map((repo) => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a href={repo.html_url} className="text-info" target="_bland">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));

    return (
      <div ref={this.profileGithubRef}>
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGithub;
