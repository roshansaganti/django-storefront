// JavaScript for handling cart interactions

function showToast(message, status) {
  // Display a toast message to the user
  $("#toastMessage").text(message);

  // Add color to the toast based on the type of message (e.g., success, error)
  if (status === "success") {
    $("#liveToast").removeClass("text-bg-danger").addClass("text-bg-success");
  } else if (status === "error") {
    $("#liveToast").removeClass("text-bg-success").addClass("text-bg-danger");
  } else {
    $("#liveToast").removeClass("text-bg-success text-bg-danger");
  }

  // Show the toast
  $("#liveToast").show();
  // Hide the toast after 3 seconds
  setTimeout(function () {
    $("#liveToast").hide();
  }, 3000);
}

$(document).ready(function () {
  // Add click event listener to the "Add to Cart" button
  $("#itemsList").on("click", "#addCartButton", function () {
    // Disable the button to prevent multiple clicks
    $(this).prop("disabled", true);
    // Get the product ID from the button's data attribute
    const productId = $(this).data("product-id");
    console.log("Product ID:", productId); // Debugging: Check if the product ID is correct
    // Send an AJAX request to add the product to the cart
    $.ajax({
      url: `/cart/add/${productId}/`, // URL to your Django view that handles adding to cart
      method: "POST",
      data: {
        product_id: productId,
        csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(), // Include CSRF token
      },
      success: function (response) {
        // Handle success (e.g., show a success message or update cart count)
        // showToast("Item added to cart!", "success");
        // Update the cart count in the navbar (if you have a cart count element)
        // For example, if you have an element with ID "cartCount":
        $("#cartNavbarLink").text(`Cart (${response.cart_item_count})`); // Update cart count in navbar
      },
      error: function (error) {
        // Handle error (e.g., show an error message)
        showToast("Error adding item to cart!", "error");
      },
    });
    // Re-enable the button after the AJAX request is complete
    $(this).prop("disabled", false);
  });
});
