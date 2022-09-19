<div class="chartHeading-org d-flex justify-content-between mt-3 rounded-top">
    <h3 class="f-21 f-w-500 mb-0">@lang('modules.department.treeView')</h3>
    <div class="heading-h3">
        <i class="fa fa-compress" id="resize"></i>
        <i class="fa fa-expand" id="full_view"></i>    
    </div>
</div>
<div id="chartDiv" class="bg-white pt-3 rounded-bottom" style="height:100%"></div>

<script>

    chartTreeClass = $('#chartOrganization').attr('class');

    if(chartTreeClass == 'col-md-12')
    {
        $('#full_view').hide();
        $('#resize').show();
    }
    else
    {
        $('#resize').hide();
    }

      var chartValue = [];
      var designationHierarchy = <?php echo json_encode($chartDesignations); ?>;

      for (var i = 0; i < designationHierarchy.length; i++) {
          if (designationHierarchy[i].parent_id == null) {
              chartValue.push({
                  x: designationHierarchy[i].name,
                  id: designationHierarchy[i].id.toString(),
              });
          } else {
              chartValue.push({
                  x: designationHierarchy[i].name,
                  id: designationHierarchy[i].id.toString(),
                  parent: designationHierarchy[i].parent_id.toString(),
              });
          }
      }

      var chart = JSC.chart('chartDiv', {
          debug: false,
          type: 'organizational',

          /*These options will apply to all annotations including point nodes and breadcrumbs.*/
          defaultAnnotation: {
              padding: [10, 30],
              margin: 10,
              minHeight: 41,
              maxHeight: 'auto',
              border: 'red',
          },

          defaultSeries: {
              color: '#e0ffcc', // background color of the node

              display: 'none',
              mouseTracking: false,
              defaultPoint: {
                  label_maxWidth: 70,
                  /* Default line styling for connector lines */
                  connectorLine: {
                      /* No radius on first angle, then 5px on the second angle. */
                      radius: [0, 5],
                      color: '#000',
                      width: 1,
                      caps: {
                          end: {
                              type: 'arrow',
                              size: 6
                          }
                      }
                  }
              }
          },
          series: [{
            defaultPoint: {
              outline: { color: '#{{ $appTheme->header_color }}'},
              color: '#fff',
            },
              points: chartValue,
          }],

          toolbar: {
              defaultItem: {
                  margin: 5,
                  events_click: orientChart
              },

          }
      });

      function orientChart(direction) {
          chart.options({
              type: 'organizational ' + direction
          });
      }
</script>
