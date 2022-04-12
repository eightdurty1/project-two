<% } %> <% if (location.comments.length) { %>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Comment</th>
          <th>WiFi Speed Score</th>
        </tr>
      </thead>
      <tbody>
          <% let total=0 %> <% location.comments.forEach(function(c) { %> <% total +=c.rating %>
            <tr>
                <td class="comment-user">
                    <img src="<%= c.userAvatar %> " alt="avatar"/><% c.userName %>

                </td>
                <td><%= c.createdAt.toLocaleDateString() %></td>
                <td><%= c.comment %></td>
                <td><%= c.rating %></td>
                <td>
                    <% if (user && user._id.equals(r.user)) { %>
                    <form action="/comments/<%= c._id %>?_method=DELETE" method="POST">
                      <button type="submit">Remove</button>
                    </form>
                    <% } %>
                  </td>
                </tr>
                <% }); %>
                <tr>
                  <td colspan="2"></td>
                  <td>
                    <strong> <%= (total / location.comments.length).toFixed(1) %> </strong>
                  </td
            </tr>  
      </tbody>
    </table>
    <% } else { %>
        <h5>Be the first to leave a comment!</h5>
    </section>















    content: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },


      req.body.comments = req.user.comments;