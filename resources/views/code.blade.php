<form action="{{ route('submit-form') }}" method="post">
  @csrf
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" name="email">
    <span class="error text-danger" id="emailError"></span>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" class="form-control" id="password" name="password">
    <span class="error text-danger" id="passwordError"></span>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("form").addEventListener("submit", function(event) {
      var email = document.querySelector("#email").value;
      var password = document.querySelector("#password").value;
      var error = false;
      if (!email) {
        document.querySelector("#emailError").textContent = "Email is required";
        error = true;
      }
      if (!password) {
        document.querySelector("#passwordError").textContent = "Password is required";
        error = true;
      }
      if (error) {
        event.preventDefault();
      }
    });
  });
</script>



<form action="{{ route('submit-form') }}" method="post">
  @csrf
  <!-- form fields here -->
  <button type="submit" class="btn btn-primary" id="submitButton">Submit</button>
</form>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("form").addEventListener("submit", function() {
      document.querySelector("#submitButton").setAttribute("disabled", "disabled");
    });
  });
</script>




use Illuminate\Support\Facades\DB;

class ExampleController extends Controller
{
    public function store()
    {
        DB::beginTransaction();

        try {
            // Insert into first table
            DB::table('table1')->insert([
                'column1' => $value1,
                'column2' => $value2,
            ]);

            // Insert into second table
            DB::table('table2')->insert([
                'column1' => $value1,
                'column2' => $value2,
            ]);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            return back()->withError('Transaction failed. Please try again.');
        }

        return redirect()->route('home')->withSuccess('Transaction completed successfully.');
    }
}
