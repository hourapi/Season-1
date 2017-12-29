import React, { Component } from "react";
import { compose, mapProps } from "recompose";
import { ApolloClient } from "apollo-client";
import { graphql, ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: new HttpLink(),
  cache: new InMemoryCache()
});

function GraphQLRoot({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

const designQuery = gql`
  query designs {
    designs {
      id
      designer {
        name
      }
      url
    }
  }
`;

let DesignList = function DesignList({ loading, designs = [] }) {
  if (loading) {
    return <p> Loading!!</p>;
  }

  return (
    <section>
      {designs.map(({ url, id }) => {
        return (
          <div>
            {" "}
            {id}
            <img src={url} />
          </div>
        );
      })}
    </section>
  );
};

DesignList = compose(
  graphql(designQuery),
  mapProps(({ data, ...rest }) => {
    return {
      designs: data && data.designs,
      loading: data && data.loading,
      ...rest
    };
  })
)(DesignList);

class App extends Component {
  render() {
    return (
      <GraphQLRoot>
        <DesignList />
      </GraphQLRoot>
    );
  }
}

export default App;
