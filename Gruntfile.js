module.exports = function (grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'compressed',
        },
        files: {
          'src/index.css': 'src/index.scss',
        },
      },
    },
    watch: {
      css: {
        files: 'src/index.scss',
        tasks: ['sass'],
      },
    },
  })

  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default', ['sass'])
  grunt.registerTask('dev', ['watch'])

}