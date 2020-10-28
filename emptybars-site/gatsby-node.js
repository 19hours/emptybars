/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

fs = require('fs');

function isComposerName(node) {
    return (node.relativeDirectory && node.relativeDirectory.split('/').length == 1 && node.internal.type == 'File' && node.name === 'name');
}

function isCompositionName(node) {
    return (node.relativeDirectory && node.relativeDirectory.split('/').length == 2 && node.internal.type == 'File' && node.name === 'name');
}

function isPerformerName(node) {
    return (node.relativeDirectory && node.relativeDirectory.split('/').length == 3 && node.internal.type == 'File' && node.name === 'name');
}

// You can delete this file if you're not using it
exports.onCreateNode = ({ node, actions }) => {
    const { createNode, createNodeField } = actions

    if (node.internal.type === `File` && (node.extension === 'json' || node.extension === 'txt')) {
        fs.readFile(node.absolutePath, undefined, (_err, buf) => {
            createNodeField({ node, name: `content`, value: buf.toString().trim()});
        });
    }
    if (isComposerName(node)) {
        createNodeField({ node, name: `type`, value: 'composerName'});
    } else if (isCompositionName(node)) {
        createNodeField({ node, name: `type`, value: 'compositionName'});
    } else if (isPerformerName(node)) {
        createNodeField({ node, name: `type`, value: 'performerName'});
    }
}

const path = require(`path`)

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions
    const fragmentPlayerTemplate = path.resolve(`src/templates/fragments-player-template.js`)
    // Query for markdown nodes to use in creating pages.
    // You can query for whatever data you want to create pages for e.g.
    // products, portfolio items, landing pages, etc.
    // Variables can be added as the second function parameter
    return graphql(`
        query MyQuery  {
          jsons: allFile(filter: {extension: {eq: "json"}}) {
            nodes {
              relativeDirectory
              fields {
                content
              }
            }
          }
        }
      `, {}).then(result => {
        if (result.errors) {
            throw result.errors
        }

        // Create blog post pages.
        result.data.jsons.nodes.forEach(node => {
            createPage({
                // Path for this page — required
                path: `${node.relativeDirectory}`,
                component: fragmentPlayerTemplate,
                context: {
                    fragments: JSON.parse(node.fields.content)
                },
            })
        })
    })
}