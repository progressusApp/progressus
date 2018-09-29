import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class KnowledgeBaseView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.categoriesWrapper}>
            {this.props.skillsCategories.map((category, key) => {
              return (
                <TouchableOpacity
                  key={key}
                  style={styles.category}
                  onPress={() =>
                    this.props.navigation.navigate('NotesView', {
                      categoryID: category.id,
                      categoryName: category.title,
                    })
                  }
                >
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  skillsCategories: state.skillsCategories,
});

export default connect(mapStateToProps)(KnowledgeBaseView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  category: {
    height: 70,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: '#c1bcbc',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64b5f6',
  },
  categoriesWrapper: {
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderColor: '#c1bcbc',
  },
});
